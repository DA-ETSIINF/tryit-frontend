import colors from 'vuetify/es5/util/colors'

export default {
	target: "server",
	env: {
		dev: process.env.NODE_ENV !== "production",
		//api: "https://iecisamandaynotupanda.congresotryit.es"
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
				content: "#035b9e"
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
			},
			{
				rel: "stylesheet",
				href: "https://unpkg.com/swiper/css/swiper.min.css"
			}
		],
		script: [
			{ src: "https://kit.fontawesome.com/358fa893fd.js", body: true },
			{ src: "https://unpkg.com/swiper/js/swiper.min.js", body: true },
			{ scr: "https://www.googletagmanager.com/gtag/js?id=UA-134663969-1", async: true }
		]
	},
	loading: { color: "#035b9e" },
	css: ["~/assets/css/main.css"],
	build: {transpile: ["swiper", "ssr-window", "dom7"]},
	buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
	vuetify:	{
		customVariables: ['~/assets/css/main.css'],
		treeShake: true,
		theme: {
		  dark: false,
		  themes: {
			light: {
			  primary: colors.indigo,
			  accent: colors.grey.darken3,
			  secondary: colors.indigo.darken4,
			  info: colors.teal.lighten1,
			  warning: colors.amber.base,
			  error: colors.deepOrange.accent4,
			  success: colors.green.accent3,
			  background: colors.indigo.lighten4,
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
