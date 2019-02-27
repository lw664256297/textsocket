<template>
    <div class="serverAdmin">

        <template>
            <Form ref="formInline">
                <Upload
                        type="drag"
                        :format="['txt']"
                        :on-format-error="handleFormatError"
                        :before-upload="handleBeforeUpload"
                        action="">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>请点击或者拖拽到此处</p>
                    </div>
                </Upload>
            </Form>

        </template>
        <Row>
            <Col>
                <ul class="file-list" v-if="file != ''">
                    <li>文件名: <span style="font-size:15px;">{{ file.name }}</span> <Icon type="ios-close" size="20" style="float:right;" @click="delFileList"></Icon></li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col span="20">
                <Button type="primary" :loading="loading" @click="upload">
                    <span v-if="!loading">上传文件</span>
                    <span v-else>Loading...</span>
                </Button>
            </Col>
        </Row>
        <Row style="margin-top:20px;">
            <Col span="12">
                <p>上传的文本数据:</p>
                <p style="height:350px;border:1px solid #888;overflow:auto">{{ value8 }}</p>
                <Button type="success" style="margin-top:20px;margin-left:20px" @click="getservertext">获取存储的文本数据</Button>
            </Col>
            <Col span="10" offset="1">
                <p>服务器推送:</p>

                <Button type="info" @click="getServerTcp">连接推送服务</Button>
                    <p>*推送服务状态-<span>{{ tcpstart }}</span></p>
                    </br>
                <Button type="success" @click="tuisongshuju">推送数据</Button>
                    <p>*当前推送服务次数:<span>{{ tuisong }}</span></p>
                    </br>
                <Button type="warning" @click="guanbfuwu">关闭推送服务</Button></br></br>
            </Col>
        </Row>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    import io from 'socket.io-client';
    export default{
        name:"serverAdmin",
        data(){
            return{
                http:"",
                file:"",
                loading:false,
                HTTPURL:"",
                islook:false,
                isfiletihsi:false,
                value8:"",
                socket:"",
                ischeng:false,
                tcpstart:"暂无链接",
                tuisong:0,
                TCPURL:""
            }
        },
        mounted(){
            let that = this;
            that.HTTPURL = this.$store.state.HTTPURL;
            that.TCPURL = this.$store.state.TCPURL;
        },
        methods:{
            //推送服务器
            tuisongshuju(){
                let that = this;
                if(that.ischeng == true){
                    that.tuisong = that.tuisong + 1;
                    that.socket.emit("message", that.value8);
                }else{
                    that.$Message.error('请打开服务器推送服务');
                }
            },
            //连接推送服务器
            getServerTcp(){
                let that = this;
                that.socket = io(that.TCPURL);
                //判断是否链接成功
                that.socket.on('tcpok', function(rdata) {
                    that.ischeng = true;
                    that.tcpstart = "链接成功";
                })
                //如果服务器断了-或者主动断了-关闭链接
                that.socket.on('disconnect', function() {
                    //关闭链接
                    that.ischeng = false;
                    that.tcpstart = "暂无链接";
                    that.socket.close();
                })
            },
            guanbfuwu(){
                let that = this;
                if(that.socket != ""){
                    that.socket.close();
                    that.ischeng = false;
                    that.tcpstart = "暂无链接";
                }
            },
            getservertext(){
                let that = this;
                let _data = {
                    id:""
                }
                axios.post(that.HTTPURL + '/users/gettext', qs.stringify(_data))
                    .then(function (rdata) {
                        if(rdata.data.length > 0){
                            let _rdata = rdata.data[0].text_main;
                            that.value8 = _rdata;
                        }else{
                            that.value8 = "暂无数据";
                        }
                        
                    })
                    .catch(function (err) {
                        console.log("服务器错误");
                    });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '错误文件格式',
                    desc: '错误文件格式 ' + file.name + ' 请上传后缀为.txt或.TXT'
                });
            },
            handleBeforeUpload(file){
                let that = this;
                console.log(file);
                that.file = file;
                return false;
            },
            //删除文件
            delFileList(){
                let that = this;
                that.file = "";
            },
            upload(){
                let that = this;
                if(that.file != ""){
                    that.loading = true;
                    //创建 formData 对象
                    let formData = new FormData();
                    formData.append('uploadFile', that.file);

                    axios.post(that.HTTPURL + "/users/upfile", formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(function (rdata) {
                        var _rdata = rdata.data[0];
                        that.value8 = _rdata.text_main;
                        that.loading = false;
                    }).catch(function (error) {
                        that.$Message.error('服务器错误' + error);
                    });

                    console.log(formData.get("uploadFile"));
                }else{
                    that.$Message.error("请上传一个文件");
                }
            }
        }
    }
</script>
<style>

</style>