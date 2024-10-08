import { registerAs } from '@nestjs/config';
import validateConfig from '@utils//validate-config';
import { IsInt, IsString, Max, Min } from 'class-validator';

export type AppConfig = {
    nodeEnv: string;
    name: string;
    port: number;
};

class EnvironmentVariablesValidator {
    @IsString()
    NODE_ENV: string;

    @IsString()
    NAME: string;

    @IsInt()
    @Min(0)
    @Max(65535)
    PORT: number;
}

export default registerAs<AppConfig>('app', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        nodeEnv: process.env.NODE_ENV,
        name: process.env.NAME,
        port: +process.env.PORT,
    };
});
