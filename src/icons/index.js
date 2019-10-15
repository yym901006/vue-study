import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'

// 自动加载svg文件
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req);

Vue.component('svg-icon', SvgIcon)