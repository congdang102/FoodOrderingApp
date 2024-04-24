import path from 'path';
import { fileURLToPath } from 'url';

// Lấy đường dẫn thư mục hiện tại
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'], // Thêm 'lh3.googleusercontent.com' vào danh sách tên miền
    }
};

export default {
    ...nextConfig,
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, './src');
        return config;
    },
};
