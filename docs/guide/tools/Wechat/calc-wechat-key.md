# 计算微信数据库 key

<script>
import MD5 from 'md5'

export default {
    data: () => ({
        _IMEI:'',
        uni:''
    }),
    computed:{
        IMEI: {
            get() {
                return this._IMEI
            },
            set(value) {
                this._IMEI = value.toUpperCase();
            }
        },
        key(){
            if (!this.IMEI|| !this.uni) return '';
            const full = this.IMEI + '' + this.uni;
            const key = MD5(full).substring(0, 7).toLowerCase()
            return key;
        }
    }
};
</script>

<div>
    <div class="form">
        <label for="IMEI">
            <span>IMEI: </span>
            <input type="text" name="IMEI" v-model.lazy.trim="IMEI" placeholder="请输入 IMEI"/>
        </label>
        <br />
        <label for="uni">
            <span>uni: </span>
            <input type="text"  name="uni" v-model.lazy.trim="uni" placeholder="请输入 uni" />
        </label>
    </div>
    <p>key: {{ key }}</p>
</div>

<style lang="sass">
.form
    input
        border: 1px solid #333
</style>
