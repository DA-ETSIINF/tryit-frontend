export default {
	env: {},
	head: {
		title: "tryit-frontend",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "Official website for Try IT! congress" }
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
			{
				src:
					"https://raw.githubusercontent.com/alvarotrigo/fullPage.js/master/vendors/scrolloverflow.min.js.map"
			}
		]
	},
	loading: { color: "#3B8070" },
	css: ["~/assets/css/main.css", "~/assets/css/fullpage.css"],
	build: {},
	buildModules: ["@nuxt/typescript-build"],
	modules: ["@nuxtjs/axios", "nuxt-fullpage.js"],
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
	}
}
