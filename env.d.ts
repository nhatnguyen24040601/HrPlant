declare module 'react-native-config' {
    export type ConfigType = {
        ENV: 'development' | 'staging' | 'production';
        API_URL: string;
    };
    const Config: ConfigType;
    export default Config;
}
