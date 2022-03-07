import colors from 'vuetify/es5/util/colors'

export default {
	target: "server",
	env: {
		dev: process.env.NODE_ENV !== "production",
		api: "https://congresotryit.es"
	},
	
	head: {
		title: "Try IT!",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content:
					"Página oficial del Congreso TryIt. Organizado por Delegación de Alumnos de la ETSIINF. Este año se celebra la edición 2020. Charlas, talleres, actividades... Y mucho más. Además, es una actividad acreditable para alumnos de la ETSIINF"
			},
			{
				hid: "geo.position",
				name: "geo.position",
				content: "40°24'16.9'' N 3°50'20.8''W"
			},
			{
				hid: "geo.placename",
				name: "geo.placename",
				content: "Bloque 1 - Campus Montegancedo de la UPM"
			},
			{
				hid: "geo.region",
				name: "geo.region",
				content: "es"
			},
			{
				hid: "robots",
				name: "robots",
				content: "index"
			},
			{
				hid: "theme-color",
				name: "theme-color",
				content: "#35b7ea"
			},
			{
				hid: "keywords",
				name: "keywords",
				content:
					"TryIt, tryit, patrocina, tecnología, conferencia, informática, hackathon, nuevas tecnologias, conference, technology, university, universidad, upm, politecnica, madrid, etsiinf, fi"
			},
			{
				hid: "DC.title",
				name: "DC.title",
				lang: "es",
				content: "Try IT!"
			},
			{
				hid: "DC.creator",
				name: "DC.creator",
				content: "Delegación de Alumnos ETSIINF"
			},
			{
				hid: "DC.description",
				name: "DC.description",
				lang: "es",
				content:
					"Página oficial del Congreso TryIt. Organizado por Delegación de Alumnos de la ETSIINF. Este año se celebra la edición 2020. Charlas, talleres, actividades... Y mucho más. Además, es una actividad acreditable para alumnos de la ETSIINF"
			},
			{
				hid: "DC.language",
				name: "DC.language",
				scheme: "RFC1766",
				content: "es"
			},
			{
				hid: "DC.coverage",
				name: "DC.coverage",
				content: "Spain"
			}
		],
		link: [
			{ rel: "shortcut icon", type: "image/png", href: "/logo.png" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Roboto:400,500,700|Source+Sans+Pro:400,600&display=swap"
			}
		],
		script: [
			{ src: "https://kit.fontawesome.com/358fa893fd.js", body: true },
			{ scr: "https://www.googletagmanager.com/gtag/js?id=UA-134663969-1", async: true }
		]
	},
	plugins: [{ src: '@/plugins/QRReader.js', mode: 'client' }],

	//TODO: change colors so they aren't hardcoded
	loading: { color: "#35b7ea" },
	css: ["~/assets/css/main.css"],
	build: {transpile: ["ssr-window", "dom7"]},
	buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
	vuetify:	{
		customVariables: ['~/assets/css/main.css'],
		treeShake: true,
		theme: {
		  dark: false,
		  themes: {
			light: {
			  primary: "#1C8DD4",
			  accent: "#35b7ea",
			  secondary: "#2982ba",
			  info: "#35b7ea",
			  warning: "#35b7ea",
			  error: "#35b7ea",
			  success: "#35b7ea",
			  background: "#2982ba",
			}
		  }
		}
	},
	modules: ["@nuxtjs/axios"
		],
	axios: {},
	router: {
		middleware: "routing-auth",
		extendRoutes(routes: any, resolve: any) {
			routes.push({
				name: "custom",
				path: "*",
				component: resolve(__dirname, "pages/not-found.vue")
			})
		}
	},
	transpileDependencies: ["vuex-module-decorators"]
}
