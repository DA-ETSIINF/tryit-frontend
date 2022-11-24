<template>
    <div class = "welcome-slider">
			<div class="slider" id="slider">
				<div class="slider-section">
					<img src="/img/welcome.jpg" alt="" class="slider-image">
				</div>
				<div class="slider-section">
					<img src="/img/volunteers.jpg" alt="" class="slider-image">
				</div>
				<div class="slider-section">
					<img src="/img/patrocinadores22.png" alt="" class="slider-image">
				</div>
				<div class="slider-section">
					<img src="/img/welcome.jpg" alt="" class="slider-image">
				</div>
			</div>
			<div class="slider-button slider_button_right" id="button-right">&#62</div>
			<div class="slider-button slider_button_left" id="button-left">&#60</div>
		</div>
</template>

<style scoped>
</style>
<script lang="ts">
if(typeof window !== 'undefined'){
const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider-section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const button_left = document.querySelector("#button-left");
const button_right = document.querySelector("#button-right");

slider?.insertAdjacentElement('afterbegin', sliderSectionLast);


function moveRight() {
	let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
	slider?.setAttribute("style", "marginLeft : -200%");/*style.marginLeft = "-200%";*/
	slider?.setAttribute("style", " transition: all in 0.5s");  /*style.transition = "all 0.5s";*/
	setTimeout(function(){
		slider?.setAttribute("style", "transition : none"); /*style.transition = "none";*/
		slider?.insertAdjacentElement('beforeend', sliderSectionFirst);
		slider?.setAttribute("style", "marginLeft : -100%");/*.style.marginLeft = "-100%";*/
	}, 500);
}

button_right?.addEventListener('click', function(){
	moveRight();
});

}

</script>
