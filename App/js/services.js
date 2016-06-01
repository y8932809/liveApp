angular.module('liveApp.services', [])
    .factory('liveRoomList', function () {
        return{
            getList: function (roomType) {
                var roomModel = new GetRoomList();
                var myList = roomModel.getList(roomType);
                return myList.data;
            }
        }
    })
var LiveRoomFactory = {
    createRoomList : function( model ){
        var roomList;
        switch( model ){
            case "ALL":
                roomList = new AllRoomList();
                break;
            case "LOL":
                roomList = new LolRoomList();
                break;
            case "Red":
                roomList = new RedRoomList();
                break;
            case "CS":
                roomList = new CsRoomList();
                break;
            case "Diverting":
                roomList = new DivertingRoomList();
                break;
            default:
                roomList = new AllRoomList();
                break;
        }
        return roomList;
    }
}
var GetRoomList = function(){};
GetRoomList.prototype = {
    getList : function( model ){
        var roomList = LiveRoomFactory.createRoomList(model);
        return roomList;
    }
};

//全部列表
function AllRoomList(){
    this.data=[{Id:'1',Name:'好声音',Img:'../resource/images/lol_rooms_1.jpg'},
        {Id:'2',Name:'瑞文专场',Img:'../resource/images/lol_rooms_2.jpg'},
        {Id:'3',Name:'跑男',Img:'../resource/images/lol_rooms_3.jpg'},
        {Id:'4',Name:'上海联赛',Img:'../resource/images/lol_rooms_4.jpg'}];
}
function DivertingRoomList(){
    this.data=[{Id:'1',Name:'上海联赛',Img:'../resource/images/lol_rooms_1.jpg'},
        {Id:'2',Name:'Runing Man',Img:'../resource/images/lol_rooms_2.jpg'},
        {Id:'3',Name:'跑男',Img:'../resource/images/lol_rooms_3.jpg'},
        {Id:'4',Name:'极限挑战',Img:'../resource/images/lol_rooms_4.jpg'}];
}

//LoL数据列表
function LolRoomList(){
    this.data=[{Id:'1',Name:'Facker的直播',Img:'../resource/images/lol_rooms_1.jpg'},
                {Id:'2',Name:'瑞文专场',Img:'../resource/images/lol_rooms_2.jpg'},
                {Id:'3',Name:'上单蛮王',Img:'../resource/images/lol_rooms_3.jpg'},
                {Id:'4',Name:'瞎子专场',Img:'../resource/images/lol_rooms_4.jpg'}];
}

function CsRoomList(){
    this.data=[{Id:'1',Name:'全国大赛',Img:'../resource/images/lol_rooms_1.jpg'},
        {Id:'2',Name:'wcg直播',Img:'../resource/images/lol_rooms_2.jpg'},
        {Id:'3',Name:'上海联赛',Img:'../resource/images/lol_rooms_3.jpg'},
        {Id:'4',Name:'精彩回放',Img:'../resource/images/lol_rooms_4.jpg'}];
}

function RedRoomList(){
    this.data=[{Id:'1',Name:'wcg2016',Img:'../resource/images/lol_rooms_1.jpg'},
        {Id:'2',Name:'1V5',Img:'../resource/images/lol_rooms_2.jpg'},
        {Id:'3',Name:'中国专场',Img:'../resource/images/lol_rooms_3.jpg'},
        {Id:'4',Name:'随机国家',Img:'../resource/images/lol_rooms_4.jpg'}];
}



//.service('tree', function () {
//    var self=this;
//    var enhanceItem= function (item,childrenName) {
//      item.$hasChildren= function () {
//        var subItems=this[childrenName];
//        return angular.isArray(subItems)&&subItems.length;
//      };
//      item.$foldToggle= function () {
//        this.$folded=!this.$folded;
//      };
//      item.$isFolded=function(){
//        return this.$folded;
//      };
//    };
//    this.enhance= function (items,childrenName) {
//      if(angular.isUndefined(childrenName)) {
//        childrenName='items';
//      }
//      angular.forEach(items, function (item) {
//        enhanceItem(item,childrenName);
//        if(item.$hasChildren()){
//          self.enhance(item[childrenName],childrenName);
//        }
//      });
//      return items;
//    }
//  })
;
