<template>
    <div>
        <!-- 按钮 -->
       <el-button  type="success" size="small" @click="toAddHandler">添加</el-button>
       <el-button type="danger" size="small" >批量删除</el-button>
       <!-- /按钮 -->
         
        <!-- 表格 -->
       <!-- :data 动态绑定值 -->
       <el-table :data="address">
           
           <el-table-column prop="id" label="编号"></el-table-column>
           <el-table-column prop="province" label="省"></el-table-column>
           <el-table-column prop="city" label="市"></el-table-column>
           <el-table-column prop="area" label="地方"></el-table-column>
            <el-table-column prop="address" label="具体地址"></el-table-column>
             <el-table-column prop="telephone" label="电话"></el-table-column>
              <el-table-column prop="customerId" label="客户编号"></el-table-column>
           <el-table-column label="操作">
               <template v-slot="slot">
                   <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                   <!-- @click.prevent阻止默认行为 ----一般a标签用prevent-->
                   <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
               </template>
           </el-table-column>
           
       </el-table>
       <!-- /表格 -->
       <!-- 分页 -->
       <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
        <!-- 分页结束 -->
        <!-- 模态框 -->
        <el-dialog
            title="地址信息"
            :visible.sync="visible"
            width="60%"
            >
            <el-form :model="form" label-width="80px">
            
                <el-form-item label="省">
                    <el-input  v-model="form.province"></el-input>
                </el-form-item>
                <el-form-item label="市">
                    <el-input  v-model="form.city"></el-input>
                </el-form-item>
                 <el-form-item label="地方">
                    <el-input v-model="form.area" ></el-input>
                </el-form-item>
                 <el-form-item label="具体地址">
                    <el-input v-model="form.address" ></el-input>
                </el-form-item>
                 <el-form-item label="电话">
                    <el-input v-model="form.telephone" ></el-input>
                </el-form-item>
                 <el-form-item label="客户编号">
                    <el-input v-model="form.customerId" ></el-input>
                </el-form-item>
            </el-form>
            <!-- footer---按钮操作区的内容 -->
            <span slot="footer" class="dialog-footer">
                <!-- @代表的事件的绑定 ==click事件-->
                <el-button size="small" @click="submitHandler">取 消</el-button>
                <el-button  size='small' type="primary" @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
    </div>       
</template>



<script>
import request from '@/utils/request';
import querystring from 'querystring';
export default {
    // methods用于存放网页中需要调用的方法

    methods:{
        loadData(){
             //    vue实例创建完毕 
            let url="http://localhost:6677/address/findAll";
            request.get(url).then((response)=>{
             // 将查询结果设置到customers----数据映射, this指向外部函数的this(url)。
            this.address=response.data;
    });
        },
        toDeleteHandler(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
             type: 'warning'
            }).then(() => {
                 //调用后台接口完成删除操作
        let url="http://localhost:6677/address/deleteById?id="+id;//传参
        request.get(url).then((response)=>{
          //刷新数据
          this.loadData();
          //提示结果
            this.$message({
                type: 'success',
               message: response.message
            });
            })
             })
        },

        toUpdateHandler(row){
              this.form=row;
              this.visible = true;
        },
        toAddHandler(){
            this.visible=true;
        },
        submitHandler(){
            //this.form对象-->>后台
            //调用request与后台进行交互，并且要携带参数
             let url="http://localhost:6677/address/saveOrUpdate";
             request({
                 url,
                 method:"POST",
                 headers:{
                     "Content-Type":"application/x-www-form-urlencoded"
                 },
                 data: querystring.stringify(this.form)//转为查询字符串
             }).then((response)=>{
                 // 模态框关闭
                 this.closeModalHandler();
                 //刷新页面
                 this.loadData();
                 //提示消息
                 this.$message({
                     type:"success",
                     message:response.message
                 })
             })
             
             
            // request.post(url,this.form)//以json形式
        },
        closeModalHandler(){

            this.visible=false;
        }

    },
    //用于存放要向网页中显示的数据
    data(){
        return{
            visible:false,
            // 动态模拟的数据
            products:[],
            form:{
                type:"address"
            }
        }
    },
    created(){
        this.loadData()
    }
}
</script>



<style scoped>

</style>>
