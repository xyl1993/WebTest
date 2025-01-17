package base.util;

/**
 * 转换从数据库返回的日期格式
 */
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

public class CustomDateTimeDeserializer extends JsonDeserializer<Date> {

	protected Logger logger = Logger.getLogger("CustomDateTimeDeserializer");

	@Override
	public Date deserialize(JsonParser jsonParser,
			DeserializationContext deserializationContext) throws IOException,
			JsonProcessingException {
		String unformatedDate = jsonParser.getText();
		SimpleDateFormat sdf = new SimpleDateFormat(
				ConstDefine.CONST_DATE_FORMATE);
		try {
			return sdf.parse(unformatedDate);
		} catch (ParseException e) {
			logger.error(e.getMessage());
			return null;
		}
	}

}
