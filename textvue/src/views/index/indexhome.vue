<template>
    <div class="indexhome">
    	<!-- 登录框 -->
    	<div class="indexlogin" v-show="islogin">
    		<Form ref="formInline" :model="formInline" :rules="ruleInline">
		        <FormItem prop="user">
		            <Input type="text" v-model="formInline.user" placeholder="请输入账号">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="password">
		            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
		                <Icon type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem>
		            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
		        </FormItem>
		    </Form>
    	</div>
        <div v-show="ismain">
            {{ value8 }}
        </div>
        
        <Button type="primary" @click="outlogin()" v-show="isoutlogin" style="width:100%;">退出登录</Button>
        
    </div>
</template>
<script>
	import axios from 'axios';
    import qs from 'qs';
    import io from 'socket.io-client';
    var _ip = returnCitySN["cip"];
    export default{
        name:"indexhome",
        data(){
        	return{
        		value8:"asdasdasdfghjkll;'</br>",
        		HTTPURL:"",
                TCPURL:"",
        		islogin:true,
        		ismain:false,
        		socket:"",
                isoutlogin:false,
                istcp:"断开",
                userid:"",
        		formInline: {
                    user: '',
                    password: '',
                    //登录时间
                    login_time:'',
                    //ip地址
                    pc_ip:_ip
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 2, max:20, message: '密码为2至20个字符', trigger: 'blur' }
                    ]
                }
        	}
        },
        mounted(){
            let that = this;
            that.HTTPURL = this.$store.state.HTTPURL;
            that.TCPURL = this.$store.state.TCPURL;
            // window.onbeforeunload = function(e){     
            //     　//var e = window.event||e;  
            //     　//e.returnValue=("确定离开当前页面吗222222？");
            //     let _data = {
            //         id:that.userid
            //     }
            //     axios.post(that.HTTPURL + '/users/editlogindan', qs.stringify(_data))
            //     .then(function (rdata){
                    
            //     })
            //     .catch(function (err) {
            //         console.log("服务器错误");
            //     });
            // } 
        },
        methods: {
            //退出登录
            outlogin(){
                let that = this;

                that.HTTPURL = this.$store.state.HTTPURL;
                let _data = {
                    id:that.userid,
                    offline_time:that.gettimes()
                };
                console.log(_data);

                that.socket.emit("outlogins", that.userid);
                axios.post(that.HTTPURL + '/users/outlogin', qs.stringify(_data))
                    .then(function (rdata){
                        window.location.reload();
                    })
                    .catch(function (err) {
                        console.log("服务器错误");
                    });
            },
            gettimes(){
                function format(Date){
                    var Y = Date.getFullYear();
                    var M = Date.getMonth() + 1;
                        M = M < 10 ? '0' + M : M;// 不够两位补充0
                    var D = Date.getDate();
                        D = D < 10 ? '0' + D : D;
                    var H = Date.getHours();
                        H = H < 10 ? '0' + H : H;
                    var Mi = Date.getMinutes();
                        Mi = Mi < 10 ? '0' + Mi : Mi;
                    var S = Date.getSeconds();
                        S = S < 10 ? '0' + S : S;
                        return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
                }
                var nowDate = new Date();

                return format(nowDate);
                //console.log(format(nowDate));
            },
            handleSubmit(name) {
            	let that = this;
                that.$refs[name].validate((valid) => {
                    if (valid) {
                    	var _data = {
                    		username:that.formInline.user,
                    		pwd:that.formInline.password,
                            pc_ip:that.formInline.pc_ip,
                            login_time:that.gettimes()
                    	}
                        //console.log(_data);
                    	axios.post(that.HTTPURL + '/users/login', qs.stringify(_data))
			                .then(function (rdata) {
                                //状态值
                                let _rdata = rdata.data.state;
                                if(_rdata == 0){
                                    that.$Message.success('登录成功!');
                                    that.islogin = false;
                                    that.ismain = true;
                                    that.isoutlogin = true;
                                    //设置id
                                    that.userid = rdata.data.id;

                                    if(rdata.data.rdatas.length > 0){
                                        that.value8 = rdata.data.rdatas[0].text_main;
                                    }else{
                                        that.value8 = "暂无数据";
                                    }

                                    that.socket = io.connect(that.TCPURL);
                                    
                                    //链接成功，发送userid到服务端
                                    that.socket.emit("getuserid", that.userid);

                                    //监听服务器推送消息
                                    that.socket.on('sedMsg', function(rdatar) {
                                        that.value8 = rdatar;
                                    });

                                    //that.istcp = "已链接";
                                    //监听是否已经断开了链接
                                    that.socket.on('disconnect', function(data) {
                                        console.log(data);
                                        that.istcp = "断开链接222";
                                        that.socket.emit("outlogins", that.userid);
                                    })

                                }else if(_rdata == 1){
                                    that.$Message.error('已经在其他地方登录了!');
                                }else{
                                    that.$Message.error('账号或密码错误!');
                                }
			                    
			                })
			                .catch(function (err) {
			                    console.log("服务器错误");
			                });
                        
                    } else {
                        that.$Message.error('请检查表单!');
                    }
                })
            }
        }
    }
</script>
<style>
	.indexlogin{
		padding: 20px;
	}
</style>