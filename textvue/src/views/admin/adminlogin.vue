<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name:"adminlogin",
        data () {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                let that = this;
                that.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let _data = {
                            username:that.form.userName,
                            pwd:that.form.password
                        };
                        axios.post(that.$store.state.HTTPURL + '/users/adminlogin', qs.stringify(_data))
                                .then(function (rdata) {
                                    let _rdata = rdata.data.status;
                                    if(_rdata === 0){
                                        sessionStorage.setItem('loginInfo', "0");
                                        that.$router.push({
                                            name: 'adminhome'
                                       });
                                    }else{
                                        that.$Notice.warning({
                                            title: '账号或者密码错误',
                                        });
                                    }
                                    console.log(rdata);
                                })
                                .catch(function (err) {
                                    console.log("服务器错误");
                                });
                    }
                });
            }
        }
    };
</script>

<style>
    .login{
        width: 100%;
        height: 100%;
        background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .login-con{
         position: absolute;
         right: 160px;
         top: 50%;
         transform: translateY(-60%);
         width: 300px;
    }

    .form-con{
        padding: 10px 0 0;
    }
</style>
