export class App {
	static deviceWidth: number
	static deviceHeight: number
	static navigatorLanguage: string
	static uris: any = {}

	constructor() {
		this.setDeviceWidth()
		this.setNavigatorLanguage()
		this.setUris()
	}

	private setNavigatorLanguage() {
		App.navigatorLanguage = window.navigator.language
	}

	private setDeviceWidth() {
		App.deviceWidth = window.innerWidth
		App.deviceHeight = window.innerHeight

		window.addEventListener("resize", () => {
			App.deviceWidth = window.innerWidth
			App.deviceHeight = window.innerHeight
		})
	}

	private setUris() {
		const apiInfo: any = process.env.api
		if (!apiInfo) {
			console.error(
				"There is no API info in the environments. Page won't load any information from the API"
			)
			return
		}
		const apiDomain = `${apiInfo.ip}:${apiInfo.port}`

		Object.keys(apiInfo.paths).forEach(
			(path) => (App.uris[path] = `${apiDomain}${apiInfo.paths[path]}`)
		)
	}
}
