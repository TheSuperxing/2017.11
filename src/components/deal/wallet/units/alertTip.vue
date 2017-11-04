<template>
	<div class="alet_container">
	    <section class="tip_text_container">
            <div class="tip_icon" @click="closeTip">
                <span></span>
                <span></span>
                <img src="../../../../assets/img/connect/guanbi1.png"/>
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
	/*	float: left;*/
		margin-left: 20px;
		margin-top: 10px;
		padding-right: 6px;
        
        
       
        
        overflow: hidden;
        .tip_text_container{
        	height: 20px;
	        line-height: 20px;
	        font-size: 12px;
        	float: left;
        	border: 1px solid #fff4bb;
        	border-radius: 5px;
        	background: #fffbe6;
	        color: orangered;
	        .tip_icon{
	        	float: left;
	        	img{
	        		height: 20px;
	        		width: 20px;
	        		margin-top: -5px;
	        	}
	        }
	        .tip_text{
	        	float: left;
	        	height: 20px;
	        	line-height: 20px;
	        	text-align: center;
	        	margin-left: 5px;
	        	/*margin-top: -2px;*/
	        }
        }
	}
</style>