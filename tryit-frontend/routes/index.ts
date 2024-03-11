interface RouteConfig {
	name: string
	path: string
	can_be_shown: Boolean
}

export const routes: RouteConfig[] = [
	{
		name: "home",
		path: "/",
		can_be_shown: true
	},
	{
		name: "ticket",
		path: "/ticket",
		can_be_shown: true
	},
	{
		name: "Event",
		path: "/event/:id",
		can_be_shown: true
	},
	{
		name: "volunteers",
		path: "/volunteers",
		can_be_shown: true
	},
	{
		name: "ects",
		path: "/ects",
		can_be_shown: true
	},
	{
		name: "previous-editions",
		path: "/previous-editions",
		can_be_shown: false
	},
	{
		name: "schedule",
		path: "/schedule",
		can_be_shown: true
	},
	{
		name: "contact",
		path: "/contact",
		can_be_shown: true
	},
	{
		name: "organizers",
		path: "/organizers",
		can_be_shown: true
	},
	{
		name: "activation-success",
		path: "/activated",
		can_be_shown: true
	},
	{
		name: "login",
		path: "/login",
		can_be_shown: true
	}

]
