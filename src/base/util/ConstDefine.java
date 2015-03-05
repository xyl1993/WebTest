package base.util;

public class ConstDefine {

	// 表名定义
	public interface Table {
		// 主键名id
		final String PRIMARY_KEY_ID = "id";
	}

	// success属性的常量定义
	public static final String CONST_SUCCESS_KEY = "success";
	// message属性的常量定义
	public static final String CONST_MESSAGE_KEY = "message";
	// total属性的常量定义
	public static final String CONST_TOTAL_KEY = "total";
	// data属性的常量定义
	public static final String CONST_DATA_KEY = "data";
	// empty属性的常量定义
	public static final String CONST_EMPTY_KEY = "empty";
	// 日期format类型(带时分秒)
	public static final String CONST_DATE_FORMATE = "yyyy-MM-dd HH:mm:ss";
	// 日期format类型(不带时分秒)
	public static final String CONST_DATE_FORMATE_2 = "yyyy-MM-dd";
}
