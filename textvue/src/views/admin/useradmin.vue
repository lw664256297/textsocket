<template>
    <div class="useradmin">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" inline>
            <Row>
                <Col span="8">
                    <FormItem label="用户账号" prop="user" style="width: 100%">
                        <Input v-model="formInline.user" placeholder="请输入用户账号"></Input>
                    </FormItem>
                </Col>

                <Col span="2" offset="1">
                    <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
                </Col>

                <Col span="3">
                    <Button type="success" @click="handleRender()">增加</Button>
                </Col>

                <Col span="3">
                    <Button type="warning" @click="handleRenderxiugai()">修改管理员密码</Button>
                </Col>
            </Row>
        </Form>
        <!--用户管理-->
        <Row>
            <Col span="24" style="height:530px;">
                <Table  ref="currentRowTable" :columns="columns3" :data="data1"></Table>
            </Col>
        </Row>

        <Page :total="total" show-total :page-size="pageSize" @on-change="changepage" :current.sync="currentpage"/>

        <!--确定删除-->
        <Modal
                v-model="modal1"
                title="删除"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>您确定要删除这条数据？</p>
        </Modal>

        <!--修改密码-->
        <Modal
                v-model="modal2"
                title="修改密码"
                @on-ok="editok"
                @on-cancel="editcancel">
            <div style="padding-right: 60px;">
                <Form>
                    <FormItem label="新密码">
                        <Input v-model="editpwd"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="editok">确定</Button>
            </div>
        </Modal>

        <!--修改管理员密码-->
        <Modal
                v-model="modal4"
                title="修改超级管理员密码">
            <div style="padding-right: 60px;">
                <Form>
                    <FormItem label="新密码">
                        <Input v-model="editpwd"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="editokadmin">确定</Button>
            </div>
        </Modal>

        <!--增加用户账号弹窗-->
        <Modal
                v-model="modal3"
                title="增加用户"
                :mask-closable="false">
            <div style="padding-right: 60px;">
                <Form ref="formLeft" :model="formLeft" label-position="right" :label-width="100" :rules="ruleInaddbox">
                    <FormItem label="账号" prop="user">
                        <Input v-model="formLeft.user"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="pwd">
                        <Input v-model="formLeft.pwd"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" @click="addok">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    export default{
        name:"useradmin",
        data () {
            return {
                currentpage:1,
                pagefenye:1,
                pageSize:10,
                total:0,
                modal1:false,
                modal2:false,
                modal3:false,
                modal4:false,
                index:"",
                HTTPURL:"",
                editpwd:"",
                id:"",
                formLeft:{
                    user:"",
                    pwd:""
                },
                formInline:{
                    user:""
                },
                ruleInline: {
                    user: [
                        { required: true, message: '查询用户名不能为空', trigger: 'blur' }
                    ]
                },
                ruleInaddbox:{
                    user:[
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    pwd:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                columns3: [
                    {
                        type: '编号',
                        key:'id',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户账号',
                        key: 'user'
                    },
                    {
                        title: '密码',
                        key: 'pwd'
                    },
                    {
                        title: 'IP地址',
                        key: 'pc_ip'
                    },
                    {
                        title: '登录时间',
                        key: 'login_time'
                    },
                    {
                        title: '登出时间',
                        key: 'offline_time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.index = params.index;
                                            this.id = params.row.id;
                                            this.modal2 = true;
                                        }
                                    }
                                }, '修改密码'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.index = params.index;
                                            this.id = params.row.id;
                                            this.modal1 = true;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        mounted(){
            let that = this;
            that.HTTPURL = this.$store.state.HTTPURL;
            let _data = {
                start:""
            };

            axios.post(that.HTTPURL + '/users/query_user_info', qs.stringify(_data))
                    .then(function (rdata){
                        that.data1 = rdata.data.data;
                        that.total = rdata.data.total;
                        console.log(rdata);
                    })
                    .catch(function (err) {
                        console.log("服务器错误");
                    });
        },
        methods: {
            editok () {
                let that = this;
                let _data = {
                    id:that.id,
                    pwd:that.editpwd
                };
                axios.post(that.HTTPURL + '/users/edituserpwd', qs.stringify(_data))
                        .then(function (rdata){
                            let _rdata = rdata.data.status;
                            if(_rdata == 0){
                                that.modal2 = false;
                                that.$Notice.success({
                                    title: '修改密码成功'
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log("服务器错误");
                        })
            },
            editcancel () {
                this.$Message.info('取消');
            },
            ok () {
                let that = this;
                let _data = {
                    id:that.id
                };
                axios.post(that.HTTPURL + '/users/deldatalist', qs.stringify(_data))
                        .then(function (rdata){
                            if(rdata.data.status == 0){
                                that.$Message.info('删除成功');
                                that.data1.splice(that.index, 1);
                                that.total  = that.total - 1;
                            }
                        })
                        .catch(function (err) {
                            console.log("服务器错误");
                        })
            },
            cancel () {
                this.$Message.info('取消');
            },
            //分页函数
            changepage(index){
                let that = this;

                let _start = ( index - 1 ) * this.pageSize;
                that.pagefenye = _start;
                let _data = {
                    start:_start
                };
                axios.post(that.HTTPURL + '/users/query_user_info', qs.stringify(_data))
                        .then(function (rdata){
                            that.data1 = rdata.data.data;
                        })
                        .catch(function (err) {
                            console.log("服务器错误");
                        })
            },
            addok () {
                let that = this;
                let _data = {
                    user:that.formLeft.user,
                    pwd:that.formLeft.pwd
                };

                that.$refs['formLeft'].validate((valid) => {
                    if (valid) {
                    axios.post(that.HTTPURL + '/users/adduser', qs.stringify(_data))
                        .then(function (rdata){
                            let _rdata = rdata.data.status;
                            console.log(_rdata);
                            //0是添加成功  1是有账号了
                            if(_rdata == 1){
                                that.modal3 = false;
                                that.$Notice.success({
                                    title: '添加账号成功'
                                });
                                that.$refs['formLeft'].resetFields();
                                window.location.reload();
                            }else{
                                that.$Notice.warning({
                                    title: '已有该账号',
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log("服务器错误");
                        });
                    }
                });
            },
            addcancel () {
                let that = this;
                this.$Message.info('Clicked cancel');
            },
            //打开增加按钮
            openedit(){
                let that = this;
                that.modal1 = true;
            },
            handleClearCurrentRow () {
                this.$refs.currentRowTable.clearCurrentRow();
            },
            handleSubmit(name){
                let that = this;
                that.$refs[name].validate((valid) => {
                    if(valid){
                        let _data = {
                            user:that.formInline.user,
                        };
                        axios.post(that.HTTPURL + '/users/query_name', qs.stringify(_data))
                                .then(function (rdata){
                                    that.data1 = rdata.data.data;
                                })
                                .catch(function (err) {
                                    console.log("服务器错误");
                                })
                    }

                });
            },
            handleRender () {
                let that = this;
                that.modal3 = true;
            },
            handleRenderxiugai(){
                let that = this;
                that.modal4 = true;
            },
            //修改管理员密码
            editokadmin(){
                let that = this;
                let _data = {
                    pwd:that.editpwd
                };
                axios.post(that.HTTPURL + '/users/edituserpwdadmin', qs.stringify(_data))
                        .then(function (rdata){
                            let _rdata = rdata.data.status;
                            if(_rdata == 0){
                                that.modal4 = false;
                                that.$Notice.success({
                                    title: '修改密码成功'
                                });
                            }
                        })
                        .catch(function (err) {
                            console.log("服务器错误");
                        })
            }
        }
    }
</script>
<style>

</style>