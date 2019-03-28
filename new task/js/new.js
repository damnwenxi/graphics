(function(){
	var Detail = function(eId,detailId){
		this.state = 'closed';
		this.el = document.getElementById(eId||'new_detail');
		this.detailEl = document.getElementById(detailId||'new');
		var self = this;
		this.detailEl.addEventListener('click',function(event){
			if(event.target !== self.el)
			{
				self.triggerSwich();
			}
		});
	};
	Detail.prototype.close=function(){
		console.log("关闭新建等按钮");
		console.log(this.el);
		this.el.className = 'detail-move-left';
		this.state = 'closed';
	};
	Detail.prototype.open=function(){
		console.log("打开新建等按钮");
		this.el.className = 'detail-move-right';
		this.state = 'opened';
	};
	Detail.prototype.triggerSwich=function(){
		if(this.state == 'opened'){
			this.close();
		}else{
			this.open();
		}
	};
	var detail = new Detail();
})();
