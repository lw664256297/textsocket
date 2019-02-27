<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <div @click="uotlogin">
                                <Icon type="ios-navigate"></Icon>
                                退出登录
                            </div>

                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 0'}">

                </Breadcrumb>
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu :active-name="activename" theme="light" width="auto" :open-names="['1']" :accordion=true @on-select="bed">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        信息管理
                                    </template>
                                    <MenuItem name="1-1">
                                        消息推送
                                    </MenuItem>

                                    <MenuItem name="1-2">
                                        账号管理
                                    </MenuItem>

                                    <!---->
                                    <!--<router-link to="/adminhome/serveradmin">-->
                                        <!---->
                                    <!--</router-link>-->

                                    <!--<router-link to="/adminhome/useradmin">-->
                                       <!---->
                                    <!--</router-link>-->


                                </Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <router-view></router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    export default{
        name:"adminhome",
        data(){
            return{
                activename:"1-1"
            }
        },
        mounted(){
            if(sessionStorage.getItem('menu') != null){
                this.activename = sessionStorage.getItem('menu');
            }
        },
        methods:{
            bed (name) {
                let that = this;
                sessionStorage.setItem('menu', name);
                if(name == "1-1"){
                    that.$router.push({
                        name: 'serveradmin'
                    });
                }else{
                    that.$router.push({
                        name: 'useradmin'
                    });
                }
            },
            //退出登录
            uotlogin(){
                sessionStorage.clear();
                this.$router.push({
                    name: 'adminlogin'
                });
            }
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>