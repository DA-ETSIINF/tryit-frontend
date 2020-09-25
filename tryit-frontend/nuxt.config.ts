// function resolve(dir) {
// 	return path.join(__dirname, dir);
// }

// module.exports = {
// 	chainWebpack: config => { config.resolve.alias.set("@", resolve("src")); }, devServer: {
// 		disableHostCheck: true
// 	}
// };

export default {
	env: {
		dev: process.env.NODE_ENV !== "production",
		api: {
			ip: "http://localhost",
			// ip: "http://127.0.0.1",
			port: 8000,
			paths: {
				workshops: "/editions/workshops/2020/",
				talks: "/editions/talks/2020/",
			},
		},
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
					"Página oficial del Congreso TryIt. Organizado por Delegación de Alumnos de la ETSIINF. Este año se celebra la edición 2020. Charlas, talleres, actividades... Y mucho más. Además, es una actividad acreditable para alumnos de la ETSIINF",
			},
			{
				hid: "geo.position",
				name: "geo.position",
				content: "40°24'16.9'' N 3°50'20.8''W",
			},
			{
				hid: "geo.placename",
				name: "geo.placename",
				content: "Bloque 1 - Campus Montegancedo de la UPM",
			},
			{
				hid: "geo.region",
				name: "geo.region",
				content: "es",
			},
			{
				hid: "robots",
				name: "robots",
				content: "index",
			},
			{
				hid: "theme-color",
				name: "theme-color",
				content: "#035b9e",
			},
			{
				hid: "keywords",
				name: "keywords",
				content:
					"TryIt, tryit, patrocina, tecnología, conferencia, informática, hackathon, nuevas tecnologias, conference, technology, university, universidad, upm, politecnica, madrid, etsiinf, fi",
			},
			{
				hid: "DC.title",
				name: "DC.title",
				lang: "es",
				content: "Try IT!",
			},
			{
				hid: "DC.creator",
				name: "DC.creator",
				content: "Delegación de Alumnos ETSIINF",
			},
			{
				hid: "DC.description",
				name: "DC.description",
				lang: "es",
				content:
					"Página oficial del Congreso TryIt. Organizado por Delegación de Alumnos de la ETSIINF. Este año se celebra la edición 2020. Charlas, talleres, actividades... Y mucho más. Además, es una actividad acreditable para alumnos de la ETSIINF",
			},
			{
				hid: "DC.language",
				name: "DC.language",
				scheme: "RFC1766",
				content: "es",
			},
			{
				hid: "DC.coverage",
				name: "DC.coverage",
				content: "Spain",
			},
		],
		link: [
			{ rel: "shortcut icon", type: "image/png", href: "/logo.png" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Roboto:400,500,700|Source+Sans+Pro:400,600&display=swap",
			},
			// {
			// 	rel: "stylesheet",
			// 	href: "https://unpkg.com/swiper/css/swiper.min.css",
			// },
		],
		script: [
			{ src: "https://kit.fontawesome.com/358fa893fd.js", body: true },
			// { src: "https://unpkg.com/swiper/swiper.min.js", body: true },
			{ scr: "https://www.googletagmanager.com/gtag/js?id=UA-134663969-1", async: true },
		],
	},
	loading: { color: "#035b/9e" },
	css: ["~/assets/css/main.css", "~/assets/css/fullpage.css"],
	build: {},
	buildModules: ["@nuxt/typescript-build"],
	modules: ["@nuxtjs/axios", "nuxt-fullpage.js", "nuxt-lazy-load"],
	axios: {},
	router: {
		middleware: "routing-auth",
		extendRoutes(routes: any, resolve: any) {
			routes.push({
				name: "custom",
				path: "*",
				component: resolve(__dirname, "pages/not-found.vue"),
			})
		},
	},
	// resolve: {
	// 	alias: {
	// 		Components: path.resolve(__dirname, 'components/'),
	// 	}
	// },
	// chainWebpack: config => { config.resolve.alias.set("@", resolve("")); },
	transpileDependencies: ["vuex-module-decorators"],
	plugins: ["./plugins/main.ts"],
}
