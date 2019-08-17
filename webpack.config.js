const path = require('path');

module.exports = {
    //...
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@com': path.resolve(__dirname, 'src/components'),
            '@inc': path.resolve(__dirname, 'src/inc'),
            '@util': path.resolve(__dirname, 'src/utils'),
            '@img': path.resolve(__dirname, 'src/resource/img'),
            '@style': path.resolve(__dirname, 'src/resource'),
            '@config': path.resolve(__dirname, 'src/config')
        }
    }
};
