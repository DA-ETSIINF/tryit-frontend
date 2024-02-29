import colors from 'vuetify/es5/util/colors'
import * as fs from "fs";
import * as path from "path";

export default {
	server: {
		port: 8050
	},
	target: "server",
	env: {
		dev: process.env.NODE_ENV !== "production",
		//api: "https://api.congresotryit.es",
		api: "http://127.0.0.1:8000",
		edition: 2024
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
					"Página oficial del Congreso TryIt. Organizado por Delegación de Alumnos de la ETSIINF. Este año se celebra la edición 2023. Charlas, talleres, actividades... Y mucho más. Además, es una actividad acreditable para alumnos de la UPM"
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
					"Página oficial del Congreso TryIt. Organizado por Delegación de Alumnos de la ETSIINF. Este año se celebra la edición 2020. Charlas, talleres, actividades... Y mucho más. Además, es una actividad acreditable para alumnos de la UPM"
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
			  info: colors.teal.lighten1,
			  warning: colors.orange.darken3,
			  close: colors.orange.darken3,
			  accept: colors.blue.darken1,
			  error: colors.deepOrange.accent4,
			  success: colors.green.darken4,
			  background: "#2982ba",
			}
		  }
		}
	},
	modules: ["@nuxtjs/axios",
		"@nuxtjs/auth-next",
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
	transpileDependencies: ["vuex-module-decorators"],
	auth: {
		strategies: {
			SIU: {
				scheme: 'openIDConnect',
				clientId: '862add94-02c9-4a55-bdc6-5973c10457b8',
				endpoints: {
					configuration: "https://siu.upm.es/realms/sso-upm/.well-known/openid-configuration",
					token: "http://tryit.upm.es/api/SIULogin/",
					userInfo: "http://tryit.upm.es/api/users/auth/",
					logout: false
				},
				redirectUri: "https://tryit.upm.es/login",
				responseType: "code",
				grantType: "authorization_code",
				scope: ["upm_oidc_default"], // Seems like SIU doesn't care what we put here
				token: { // Sets the token for axios automatically
					'property': 'key',
					'type': 'Token'
				},
				cookie: { // Also sets cookie
					name: 'sessionid',
					options: {
						path: '/',
						secure: true
					}
				}
			}
		}
	}
}
