var CommonUtil = new function(){
        this.themeGridRenderer = function(value){
            return "<div style='height:80px;padding-top:30px'>"+value+"</div>"
        },

        this.spitString = function(value,size){
            return value.substring(0,size)+"……";
        }

    this.getImageUrlName = function(fileUrl) {
        return fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length);
    }
}