import { spawn } from 'child_process';
import { promisify } from 'util';
import * as stream from 'stream';
import * as process from "process";
const pipeline = promisify(stream.pipeline);

// 封装Go调用逻辑
export async function callGoProgram(bin: string, env: { [key: string]: any }, data: unknown) {
    const goProcess = spawn(bin, {env: {
        ...process.env,
        ...env,
    } });
    goProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
    });

    // 创建一个可写流，以便我们可以发送数据到Go程序
    const sender = new stream.Readable({
        read() {
            this.push(JSON.stringify(data));
            this.push(null); // 表示数据发送完毕
        },
    });

    // 使用pipeline管理流，自动处理数据流完结和错误
    await pipeline(
        sender,
        goProcess.stdin
    );

    // 收集Go程序的输出
    let output = '';
    for await (const chunk of goProcess.stdout) {
        output += chunk;
    }

    return JSON.parse(output);
}
