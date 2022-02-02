import axios from "axios"

export const schoolsUPM: string =
	"https://www.upm.es/wapi_upm/academico/comun/index.upm/v2/centro.json"

export function getHTTP(path: string): Promise<any> {
	return new Promise<void>((resolve, reject) => {
		axios.get(path).then(() => resolve())
	})
}
