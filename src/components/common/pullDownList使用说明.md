 引入 ：import pullDownList from '@/components/common/pullDownList'
		<pull-downl-ist :prop="list"></pull-downl-ist>
	
	list: {
        title: '',  // 文本框前文字标题
		titleWidth: 70, // 文本框前文字标题宽
        parentEvent: 'inquiryLetter', // 父组件事件处理方法名
        default: '全部', // 文本默认显示
        listWidth: 160, // 选择的下拉列表宽
        nowSelectWidth: 160, // 文本框宽
        nowSelectHeight: 36, // 文本框高
		nowSelectFontSize：13, // 文本框字体大小
        list:['全部类别', '年度问询函', '问询函'] // 列表数组
      }
	