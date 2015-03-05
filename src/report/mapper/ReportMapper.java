package report.mapper;

import java.util.List;
import java.util.Map;

import report.model.ReportModel;

public interface ReportMapper {

	public List<ReportModel> getHzReport(Map<String, Object> paramsMap);
}
