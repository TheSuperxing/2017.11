<template>
	<div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon" @click="closeTip">
                <span></span>
                <span></span>
                <img src="../../../static/img/connect/guanbi1.png"/>
            </div>
           
             <p class="tip_text">{{alertText}}</p>
        </section>
    </div>
</template>

<script>
	 export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
	.alet_container{
		position: absolute;
		bottom: 100px;
        width: 300px;
        height: 20px;
        line-height: 20px;
        background: #fffbe6;
        border: 1px solid #fff4bb;
        border-radius: 5px;
        /*overflow: hidden;*/
        .tip_text_container{
       
	        border: 1px;
	        color: orangered;
	        .tip_icon{
	        	float: left;
	        	img{
	        		height: 20px;
	        		width: 20px;
	        		margin-top: -6px;
	        	}
	        }
	        .tip_text{
	        	float: left;
	        	height: 20px;
	        	line-height: 20px;
	        	text-align: center;
	        	margin-top: -3px;
	        	margin-left: 25px;
	        }
        }
	}
</style>