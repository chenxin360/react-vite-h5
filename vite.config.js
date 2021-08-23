import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		reactRefresh(),
		styleImport({
			libs: [
				{
					libraryName: 'zarm',
					esModule: true,
					resolveStyle: name => {
						return `zarm/es/${name}/style/css`
					}
				}
			]
		})
	],
	css: {
		modules: {
			localsConvention: 'dashesOnly'
		},
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			utils: path.resolve(__dirname, 'src/utils')
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:7001/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
