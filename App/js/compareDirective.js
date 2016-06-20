/**
 * Created by user on 2016-06-12.
 */

    /**
     * ��ȡ�ֶ�ֵ
     * @param {Object} obj ��ǰָ������������
     * @param {String} key ֧��xx.xxx.xx���Ƶ���ʽ
     * @return {Object} ��Ӧ��ֵ
     */
    function getFieldValue(obj, key) {


    }

    /**
     * �̳з���
     * @param {Function} superClass ����
     * @param {Function} subClass ����
     */
    function inherit(superClass, subClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;


    }

    /**
     * �Ƚ���������
     * @param {string} operator �Ƚ���
     * @param {any} value       ԭʼֵ
     * @param {any} compareTo   �Ƚ�ֵ
     */
    function ValueCompareStrategy(operator, value, compareTo) {
        this.operator = operator;
        this.value = this.getValue(value);
        this.compareTo = this.getCompareTo(compareTo);
    }

    /**
     * ����ͬ�ıȽ���ע�ᵽValueCompareStrategy
     * @param {String} dataType �Ƚ�������
     * @param {Function} fun    �Ƚ������캯��
     */
    ValueCompareStrategy.regist = function (dataType, fun) {
        if (this[dataType]) {
            return false;
        }
        this[dataType] = fun;
    }

    /**
     * �����������ͣ���ȡ��Ӧ�ıȽ������캯��
     * @param {String} dataType ��������
     * @returns {Function}      �������Ͷ�Ӧ�Ĺ��캯��
     */
    ValueCompareStrategy.get = function (dataType) {
        return ValueCompareStrategy[dataType] || ValueCompareStrategy;
    }

    /**
     * ��ȡ�Ƚ�ֵ����ֵΪ�Ƚϲ�����ߵ�Ԫ��
     * @param {any} value   �Ƚ���
     * @returns {any} {*}   ������ʽת����ֵ
     */
    ValueCompareStrategy.prototype.getValue = function (value) {
        return value
    }

    /**
     * ��ȡ�Ƚ�ֵ����ֵΪ�Ƚϲ����ұߵ�Ԫ��
     * @param {any} compareTo   ���Ƚ�ֵ
     * @returns {any} {*}       ������ʽת���ıȽ�ֵ
     */
    ValueCompareStrategy.prototype.getCompareTo = function (compareTo) {
        return compareTo;
    }

    /**
     * Ĭ�ϵıȽϷ���
     * @param {String} op       �Ƚϲ�����
     * @param {any} value       �Ƚ�ֵ
     * @param {any} compareTo   �±Ƚ�ֵ
     * @returns {boolean}          ������ʽת���ıȽ�ֵ
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
     * ��֤�Ƚ�ֵ�ͱ��Ƚ�ֵ�Ƿ�Ϸ���������ҷ�����Ӧ�ð��ֶκϷ��Ե���֤Ȩ������һ����У����
     * @returns {boolean} �Ƿ�Ϸ�
     */
    ValueCompareStrategy.prototype.valueValidate = function () {
        return true;
    }

    /**
     * ��ʼ���Ƚ���
     * ע�⣺����չʱ����Ҫ���ȶ����Ӧ���ݸ�ʽ�Ĺ�������Ȼ���ڸú�������Ӷ�Ӧ��datatype����
     * @return {[type]} [description]
     */
    function initValidateCompare() {
        /**
         * ֧�ֱȽ��������ͳ���
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

        //����ͬ���ݸ�ʽ�ıȽ���ע�ᣬ���Ҽ̳�Ĭ�ϵıȽ���������
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
            //���value��ֵ����ʱ���ַ�������ʱ�������ֱ�ӳ�1��ת����
            //���ֵ�ǺϷ������֣��򲻻�Խ������Ӱ�죬���ֵ��NaN������ںϷ������жϷ���false����ѿ���������������֤��
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
            //���value��ֵ����ʱ���ַ�������ʱ�������ֱ�ӳ�1��ת����
            //���ֵ�ǺϷ������֣��򲻻�Խ������Ӱ�죬���ֵ��NaN������ںϷ������жϷ���false����ѿ���������������֤��
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
                    var watch=true; //��ʱ���ж�����
                    var op = attrs.compareOperation;

                    if (watch !== false) {
                        scope.$watch(compare, function () {
                            var fromWatch = true;
                            var value = ctrl.$modelValue;
                            compareFiledValue(value, fromWatch);
                        })
                    }
                    ctrl.$parsers.unshift(compareFiledValue); //��ӶԵ�ǰָ����ֶν��м��

                    function compareFiledValue(value, fromWatch) {
                        /*����Ǳ�����ֶεı仯���򱻼���ֶα仯������ĵ�ǰ�ֶε���֤��Ϊֻ����ͨ������������������ͨ���Ķ�����
                         ԭ������������趨�������������ֶα༭������ǰ�ֶ���ʾ������������������Ȼ˼ά��
                         �෴�������ֶα༭�Ӷ�ʹ��ǰ�ֶε�ֵ�Ϸ�����Ӧ��ȥ����ǰ�ֶεĴ�����ʾ*/
                        //if (fromWatch) {
                        //    ctrl.$setValidity('compare', true);
                        //    return value;
                        //}
                        //ctrl.$setValidity('compare', true);

                        //�ֶ�ֵΪ��ʱ�����߱Ƚ��߼���ֱ�ӰѺϷ����жϿ���Ȩ������һ������֤����
                        if (value === undefined) {
                            return value;
                        }
                        var compareTo = scope.$eval(compare);
                        if (compareTo === undefined) {
                            return value;
                        }
                        var compareHandler = new CompareHandler(op, value, compareTo);

                        //�����Ƚ��ֶε�ֵ���Ϸ�ʱ �������ʽ���ԣ����粻�����֣����粻��object�ȵȣ���Ҳ���߱Ƚ��߼�����Ϊ�϶��������ı���֤��
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
    //                    /*����Ǳ�����ֶεı仯���򱻼���ֶα仯������ĵ�ǰ�ֶε���֤��Ϊֻ����ͨ������������������ͨ���Ķ�����
    //                     ԭ������������趨�������������ֶα༭������ǰ�ֶ���ʾ������������������Ȼ˼ά��
    //                     �෴�������ֶα༭�Ӷ�ʹ��ǰ�ֶε�ֵ�Ϸ�����Ӧ��ȥ����ǰ�ֶεĴ�����ʾ*/
    //                    if (fromWatch) {
    //                        ctrl.$setValidity('compare', true);
    //                        return value;
    //                    }
    //                    ctrl.$setValidity('compare', true);
    //
    //                    //�ֶ�ֵΪ��ʱ�����߱Ƚ��߼���ֱ�ӰѺϷ����жϿ���Ȩ������һ������֤����
    //                    if (value === undefined) {
    //                        return value;
    //                    }
    //                    var compareTo = scope.$eval(compare),
    //                        compareHandler = new CompareHandler(op, value, compareTo);
    //
    //                    //�����Ƚ��ֶε�ֵ���Ϸ�ʱ �������ʽ���ԣ����粻�����֣����粻��object�ȵȣ���Ҳ���߱Ƚ��߼�����Ϊ�϶��������ı���֤��
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
