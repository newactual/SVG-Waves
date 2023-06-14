import './style.css'

function isNull(value) {
	if(value === null || typeof value === 'undefined') {
		return true;
	}

	return false;
}

/** 
 * @copyright 2016 (c) Mikolaj Stolarski
 * @link https://codepen.io/grimor/pen/qbXLdN
 * @author Frank Asante <me@frankasante.com>
 * 
 * @summary Creates a wave animation on an exisitng SVG path.
 * @param {String} parent_container_selector - Parent node of SVG element.
 * @param {String} wave_path_selector - Path node of SVG element.
 * @param {Number} wave_speed - Speed of the wave animation.
 * @param {Number} wave_height - Position from the top of parent_container_selector.
 * @param {Number} wave_delta - Wave amplitude.
 * @param {Number} wave_points - The number of points used to compute our wave.

 * @return {void}
*/
function setWave(parent_container_selector, wave_path_selector, wave_speed = 0.5, wave_points = 6, wave_height = 75, wave_delta = 20) {
	const parentContainer = document.querySelector(parent_container_selector);
	const wave = document.querySelector(wave_path_selector);

	if ( isNull(parentContainer) ) {
		console.warn('Parent container is null or undefined.');
		return;
		
	}else if( isNull(wave) ) {
		console.warn('Wave path is null or undefined.');
		return
	}

	const container = document.body;
	const width = container.offsetWidth;
	// const height = parentContainer.offsetHeight + 4;
	const height = parentContainer.offsetHeight;
	
	const waveWidth = container.offsetWidth;  // Wave SVG width (usually container width)
	const waveHeight = wave_height;                   // Position from the top of container
	const waveDelta = wave_delta;                     // Wave amplitude
	const speed = wave_speed;                        // Wave animation speed
	const wavePoints = wave_points;                     // How many point will be used to compute our wave
	
	let points = [];
	
	function calculateWavePoints(factor) {
		let points = [];
	
		for (let i = 0; i <= wavePoints; i++) {
			let x = i / wavePoints * waveWidth;
			let sinSeed = (factor + (i + i % wavePoints)) * speed * 100;
			let sinHeight = Math.sin(sinSeed / 100) * waveDelta;
			let yPos = Math.sin(sinSeed / 100) * sinHeight + waveHeight;
			points.push({ x: x, y: yPos });
		}
	
		return points;
	}
	
	function buildPath(points) {
		let SVGString = 'M ' + points[0].x + ' ' + points[0].y;
	
		let cp0 = {
			x: (points[1].x - points[0].x) / 2,
			y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
		};
	
		SVGString += ' C ' + cp0.x + ' ' + cp0.y + ' ' + cp0.x + ' ' + cp0.y + ' ' + points[1].x + ' ' + points[1].y;
	
		let prevCp = cp0;
		let inverted = -1;
	
		for (let i = 1; i < points.length - 1; i++) {
			let cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
			let cp1 = {
				x: (points[i].x - prevCp.x) + points[i].x,
				y: (points[i].y - prevCp.y) + points[i].y
			};
	
			SVGString += ' C ' + cp1.x + ' ' + cp1.y + ' ' + cp1.x + ' ' + cp1.y + ' ' + points[i + 1].x + ' ' + points[i + 1].y;
			prevCp = cp1;
			inverted = -inverted;
		};
	
		SVGString += ' L ' + width + ' ' + height;
		SVGString += ' L 0 ' + height + ' Z';
		return SVGString;
	}
	
	let lastUpdate;
	let totalTime = 0;
	
	function tick() {
		let now = window.Date.now();
	
		if (lastUpdate) {
			let elapsed = (now - lastUpdate) / 1000;
			lastUpdate = now;
	
			totalTime += elapsed;
	
			let factor = totalTime * Math.PI;
			wave.setAttribute('d', buildPath(calculateWavePoints(factor)));
		} else {
			lastUpdate = now;
		}
	
		window.requestAnimationFrame(tick);
	};
	tick();
}

window.addEventListener('DOMContentLoaded', () => {
	/* 
		A function was created based off another piece of code to make this easier.
		See the function above for more details.

		You may change the parameters to your liking.
		I hope the documentation is clear enough. :D
	*/

	setWave('#header-wave-container', '#header-wave-path', 0.2, 3, 30);
	
	setWave('#header-2-wave-container', '#header-2-wave-path', 0.2, 3, 30);
	
	setWave('#footer-container', '#footer-wave-path', 0.3, 3);
});