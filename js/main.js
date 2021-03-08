const app = Vue.createApp({
	data:() => ({
		title: "Gradient Generator",
		color1: "#8a32e0",
		color2: "#ffc800",
		orientation: 1
	}),
	computed: {
		setColor(){
			if (this.orientation == 1) {
				return "background: linear-gradient(to right,"+this.color1+`, `+this.color2+`);`;
			} else if (this.orientation == 2) {
				return "background: linear-gradient(to left,"+this.color1+`, `+this.color2+`);`;
			} else if (this.orientation == 3) {
				return "background: linear-gradient(to top,"+this.color1+`, `+this.color2+`);`;
			} else {
				return "background: linear-gradient(to bottom,"+this.color1+`, `+this.color2+`);`;
			}
			
		}
	}
});