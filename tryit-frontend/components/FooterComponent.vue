<template>
	<footer>
		<!-- TODO Add links-->
		<div class="footer-container restrict-width">
			<div class="organizations">
				<div class="organizer">
					<h6>Organiza</h6>
					<div>
						<img src="@/assets/img/daetsiinf.png" alt="Logo de DA-ETSIINF" />
					</div>
				</div>
				<div class="collaborators">
					<h6>Colabora</h6>
					<div>
						<img src="@/assets/img/ACM.png" alt="Logo de ACM" />
					</div>
				</div>
			</div>
			<div class="find-us">
				<i class="fab fa-twitter"></i>
				<span>Contacto</span>
				<i class="fab fa-github"></i>
			</div>
			<i class="fab fa-creative-commons creative-commons"></i>
		</div>
	</footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class FooterComponent extends Vue {}
</script>

<style scoped>
footer {
	background-color: var(--neutral-9);
	padding: var(--space-l) 0;
	padding-bottom: 0;
	margin: auto;
	width: 100%;
}

footer h6 {
	color: var(--neutral-5);
	font-size: 11px;
}

.footer-container {
	max-width: 500px;
	margin: 0 auto;
}

.organizations {
	display: flex;
	justify-content: space-around;
}

.organizations > div > div {
	display: flex;
	justify-content: center;
}
.organizations > div > div {
	margin-top: var(--space-xs);
}

.organizations > div > div img {
	margin: 0 var(--space-xxs);
}

.organizations > .organizer > div img {
	max-height: 35px;
}
.organizations > .collaborators > div img {
	max-height: 25px;
	margin-top: var(--space-xs);
	display: flex;
	align-items: center;
}

.find-us {
	max-width: 250px;
	margin: var(--space-l) auto;
	display: flex;
	justify-content: space-around;
	align-items: baseline;
	color: var(--neutral-5);
	cursor: pointer;
}

.find-us *:hover {
	color: var(--neutral-3);
}

.creative-commons {
	color: var(--neutral-5);
	width: 100%;
	text-align: center;
	font-size: 18px;
	padding-bottom: var(--space-xss);
}
</style>
