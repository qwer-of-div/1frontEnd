<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	button {
		padding: 0upx;
		margin: 0upx;
		border: none;
		border-radius: 0upx;
		box-sizing: border-box;
	}
	
	.button-hover {
		transform: translate(3upx, 3upx) !important;
		transition: .2s;
	}
	
	button::after {
	  border: none
	}
	
	/*每个页面公共css */
	@font-face {
	  font-family: 'iconfont';  /* project id 1568268 */
	  src: url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.eot');
	  src: url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1568268_lj6pp5t7hf.svg#iconfont') format('svg');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 25px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.iconweixin:before {
	  content: "\e66f";
	}
	
	.iconzhifubao:before {
	  content: "\e68e";
	}
	
	.iconzhifubao1:before {
	  content: "\e60f";
	}
</style>
