<template>
    <div>
        <!-- 按钮 -->
       <el-button type="success" size="small" @click="toAddHandler">添加</el-button>
       <el-button type="danger" size="small" >批量删除</el-button>
        <!-- /按钮结束 -->
        <!-- 表格 -->
       <el-table :data="categories">
           <el-table-column prop="id" label="编号" ></el-table-column>
           <el-table-column prop="name" label="栏目名称" ></el-table-column>
           <el-table-column prop="num" label="序号" ></el-table-column>
           <el-table-column prop="parentId" label="父栏目" ></el-table-column>
           <el-table-column label="操作" >
               <template v-slot="slot">
                    <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
               </template>
           </el-table-column>
       </el-table>
        <!-- /表格结束 --> 
        <!-- 分页开始 -->
        <!-- <el-pagination layout="prev, pager, next" :total="50"> -->
        <!-- </el-pagination> -->
        <!-- /分页结束 -->
        <!-- 模态框 -->
        <el-dialog title="添加栏目信息"  :visible.sync="visible"  width="60%">
            ---{{form}}
            <el-form :model="form" label-width="80px">
                <el-form-item label="栏目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input v-model="form.num"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeModalHandler" size="small">取 消</el-button>
                <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
            </span>
        </el-dialog>
         <!-- /模态框结束 -->       
    </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    //暴露接口,用于存放网页中需要调用的方法
    methods:{
        loadData(){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
            //将查询结果设置到customers中，this指向外部函数的this
            this.categories = response.data;
        })
        },
        submitHandler(){
            //this.form 对象 ---字符串--> 后台 {type:'customer',age:12}
            // json字符串 '{"type":"customer","age":12}'
            // request.post(url,this.form)
            // 查询字符串 type=customer&age=12
            // 通过request与后台进行交互，并且要携带参数
            let url = "http://localhost:6677/category/saveOrUpdate"
            request({
                url,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:querystring.stringify(this.form)
            }).then((response)=>{
                //模态框关闭
                this.closeModalHandler();
                //刷新
                this.loadData();
                //关闭模态框
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        toDeleteHandler(id){
            //确认
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用后台接口完成删除操作
                let url = "http://localhost:6677/category/deleteById?id="+id;
                request.get(url).then((response)=>{
                    //刷新数据
                    this.loadData();
                    //提示结果
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                })
                
            })
        },
        toUpdateHandler(row){
            this.form=row;
            this.visible=true;
        },
        closeModalHandler(){
            this.visible=false;
        },
        toAddHandler(){
            //将form变为初始值
            this.form = {
                type:"category"
            }
            this.visible=true;
        }
    },
    //用于存放要想网页中显示的数据
    data(){
        return{
            visible:false,
            categories:[],
            form:{
                type:"category"
            }
        }
    },
    created(){
        //this为当前vue实例对象
        //vue实例完毕
        this.loadData()
    }    
}
</script>