/**
 * Created by user on 2016-06-12.
 */

    /**
     * 获取字段值
     * @param {Object} obj 当前指令所在作用域
     * @param {String} key 支持xx.xxx.xx类似的形式
     * @return {Object} 对应的值
     */
    function getFieldValue(obj, key) {


    }

    /**
     * 继承方法
     * @param {Function} superClass 父类
     * @param {Function} subClass 子类
     */
    function inherit(superClass, subClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;


    }

    /**
     * 比较器策略类
     * @param {string} operator 比较器
     * @param {any} value       原始值
     * @param {any} compareTo   比较值
     */
    function ValueCompareStrategy(operator, value, compareTo) {
        this.operator = operator;
        this.value = this.getValue(value);
        this.compareTo = this.getCompareTo(compareTo);
    }

    /**
     * 将不同的比较器注册到ValueCompareStrategy
     * @param {String} dataType 比较器类型
     * @param {Function} fun    比较器构造函数
     */
    ValueCompareStrategy.regist = function (dataType, fun) {
        if (this[dataType]) {
            return false;
        }
        this[dataType] = fun;
    }

    /**
     * 根据数据类型，获取对应的比较器构造函数
     * @param {String} dataType 数据类型
     * @returns {Function}      数据类型对应的构造函数
     */
    ValueCompareStrategy.get = function (dataType) {
        return ValueCompareStrategy[dataType] || ValueCompareStrategy;
    }

    /**
     * 获取比较值，该值为比较操作左边的元素
     * @param {any} value   比较数
     * @returns {any} {*}   经过格式转换的值
     */
    ValueCompareStrategy.prototype.getValue = function (value) {
        return value
    }

    /**
     * 获取比较值，该值为比较操作右边的元素
     * @param {any} compareTo   被比较值
     * @returns {any} {*}       经过格式转换的比较值
     */
    ValueCompareStrategy.prototype.getCompareTo = function (compareTo) {
        return compareTo;
    }

    /**
     * 默认的比较方法
     * @param {String} op       比较操作符
     * @param {any} value       比较值
     * @param {any} compareTo   呗比较值
     * @returns {boolean}          经过格式转换的比较值
     */
    ValueCompareStrategy.prototype.compare = function (op, value, compareTo) {
        var value = this.value,
            compareTo = this.compareTo,
            result = true;

        switch (op) {
            case 'eq':
                result = (compareTo == value);
                break;
            case 'eqeqeq':
                result = (compareTo == value);
                break;
            case 'lt':
                result = (value < compareTo);
                break;
            case 'gt':
                result = (value > compareTo);
                break;
            case 'le':
                result = (value <= compareTo);
                break;
            case  'ge':
                result = (value >= compareTo);
                break;
        }
        return result;
    }

    /**
     * 验证比较值和被比较值是否合法，如果不揭发，则应该吧字段合法性的验证权交给下一个表单校验器
     * @returns {boolean} 是否合法
     */
    ValueCompareStrategy.prototype.valueValidate = function () {
        return true;
    }

    /**
     * 初始化比较器
     * 注意：做扩展时，需要首先定义对应数据格式的构造器，然后在该函数中添加对应的datatype即可
     * @return {[type]} [description]
     */
    function initValidateCompare() {
        /**
         * 支持比较数据类型常量
         * @type {Object}
         */
        var CONST = {
            DATATYPES: {
                number: NumberCompare,
                date: DateCompare
            }
        }
        var dataTypes = CONST.DATATYPES,
            constructor = "";

        //将不同数据格式的比较器注册，并且继承默认的比较器策略类
        for (var dataType in dataTypes) {
            if (dataTypes.hasOwnProperty(dataType)) { //?
                constructor = dataTypes[dataType];
                ValueCompareStrategy.regist(dataType, constructor);
                inherit(ValueCompareStrategy, constructor);
            }
        }
    }

    initValidateCompare();

    function NumberCompare() {
        ValueCompareStrategy.apply(this, Array.prototype.slice.call(arguments, 0));

    }

    NumberCompare.prototype.getValue = function (value) {
        return value * 1;
    }

    NumberCompare.prototype.getCompareTo = function (compareTo) {
        return compareTo * 1;
    }

    NumberCompare.prototype.valuesValidate = function () {
        return this.value === this.value && this.compareTo === this.compareTo;
    }

    function DateCompare() {
        ValueCompareStrategy.apply(this.Array.prototype.slice.call(arguments, 0));
        this.originValue = arguments[1];
        this.originCompareToValue = arguments[2];
    }

    DateCompare.prototype.getValue = function (value) {
        if (angular.isString(value)) {
            value = Date.parse(value);
        } else if (angular.isDate(value)) {
            value = value.getTime();
        } else {
            //如果value的值不是时间字符串或者时间对象，则直接乘1做转换，
            //如果值是合法的数字，则不会对结果产生影响，如果值是NaN，则会在合法性中判断返回false，会把控制器交给其他验证器
            value = value * 1;
        }
        return value;
    }

    DateCompare.prototype.getCompareTo = function (value) {
        if (angular.isString(value)) {
            value = Date.parse(value);
        } else if (angular.isDate(value)) {
            value = value.getTime();
        } else {
            //如果value的值不是时间字符串或者时间对象，则直接乘1做转换，
            //如果值是合法的数字，则不会对结果产生影响，如果值是NaN，则会在合法性中判断返回false，会把控制器交给其他验证器
            value = value * 1;
        }
        return value;
    }

    DateCompare.prototype.valueValidate = function () {
        return this.value === this.value && this.compareTo === this.compareTo;
    }
    angular.module('liveApp.directives').directive('compare',
        function () {
            return {
                require: 'ngModel',
                link: function (scope, el, attrs, ctrl) {
                    var dataType = attrs.compareDataType || 'number';
                    var CompareHandler = ValueCompareStrategy.get(dataType);
                    var compare = attrs.compare;
                    // var obj = scope;//scope[attrs.compare]
                    //var watch = attrs.watchCompareField;
                    var watch=true; //暂时所有都监视
                    var op = attrs.compareOperation;

                    if (watch !== false) {
                        scope.$watch(compare, function () {
                            var fromWatch = true;
                            var value = ctrl.$modelValue;
                            compareFiledValue(value, fromWatch);
                        })
                    }
                    ctrl.$parsers.unshift(compareFiledValue); //添加对当前指令的字段进行监控

                    function compareFiledValue(value, fromWatch) {
                        /*如果是被监控字段的变化，则被监控字段变化所引起的当前字段的验证行为只做“通过”动作，不做“不通过的动作，
                         原因：如果不这样设定，则会出现其他字段编辑引发当前字段提示错误的情况，不符合自然思维。
                         相反，其他字段编辑从而使当前字段的值合法，则应该去掉当前字段的错误提示*/
                        //if (fromWatch) {
                        //    ctrl.$setValidity('compare', true);
                        //    return value;
                        //}
                        //ctrl.$setValidity('compare', true);

                        //字段值为空时，不走比较逻辑，直接把合法性判断控制权交给下一个表单验证器。
                        if (value === undefined) {
                            return value;
                        }
                        var compareTo = scope.$eval(compare);
                        if (compareTo === undefined) {
                            return value;
                        }
                        var compareHandler = new CompareHandler(op, value, compareTo);

                        //两个比较字段的值不合法时 （比如格式不对，比如不是数字，比如不是object等等），也不走比较逻辑（因为肯定有其他的表单验证器
                        //if (!compareHandler.valuesValidate()) {
                        //    return true;
                        //}

                        var result = compareHandler.compare(op);
                        ctrl.$setValidity('compare', result);

                        return value;
                    }
                }
            }
        })

    //angular.module('liveApp.directives').directive('compare',
    //    function () {
    //        return {
    //            require: 'ngModel',
    //            link: function (scope, el, attrs, ctrl) {
    //                var dataType = attrs.compareDataType || 'number';
    //                var CompareHandler = ValueCompareStrategy.get(dataType);
    //                var compare = attrs.compare;
    //               // var obj = scope;//scope[attrs.compare]
    //                var watch = attrs.watchCompareField;
    //                var op = attrs.compareOperation;
    //
    //                if (watch !== false) {
    //                    scope.$watch(compare, function () {
    //                        var fromWatch = true;
    //                        var value = ctrl.$modelValue;
    //                        compareFiledValue(value, fromWatch);
    //                    })
    //                }
    //                ctrl.$parsers.unshift(compareFiledValue);
    //
    //                function compareFiledValue(value, fromWatch) {
    //                    /*如果是被监控字段的变化，则被监控字段变化所引起的当前字段的验证行为只做“通过”动作，不做“不通过的动作，
    //                     原因：如果不这样设定，则会出现其他字段编辑引发当前字段提示错误的情况，不符合自然思维。
    //                     相反，其他字段编辑从而使当前字段的值合法，则应该去掉当前字段的错误提示*/
    //                    if (fromWatch) {
    //                        ctrl.$setValidity('compare', true);
    //                        return value;
    //                    }
    //                    ctrl.$setValidity('compare', true);
    //
    //                    //字段值为空时，不走比较逻辑，直接把合法性判断控制权交给下一个表单验证器。
    //                    if (value === undefined) {
    //                        return value;
    //                    }
    //                    var compareTo = scope.$eval(compare),
    //                        compareHandler = new CompareHandler(op, value, compareTo);
    //
    //                    //两个比较字段的值不合法时 （比如格式不对，比如不是数字，比如不是object等等），也不走比较逻辑（因为肯定有其他的表单验证器
    //                    if (!compareHandler.valuesValidate()) {
    //                        return true;
    //                    }
    //
    //                    var result = compareHandle.compare(op);
    //                    ctrl.$setValidity('compare', result);
    //
    //                    return value;
    //                }
    //            }
    //        }
    //    })
