package report.service;

import java.util.List;
import java.util.Map;

import report.model.ReportModel;

public interface ReportService {
	public List<ReportModel> getHzReport(Map<String, Object> paramsMap);
}
