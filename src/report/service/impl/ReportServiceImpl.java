package report.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import report.mapper.ReportMapper;
import report.model.ReportModel;
import report.service.ReportService;

@Service("ReportService")
public class ReportServiceImpl implements ReportService {

	
	@Autowired
	private ReportMapper reportMapper;
	@Override
	public List<ReportModel> getHzReport(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return reportMapper.getHzReport(paramsMap);
	}

	
}
