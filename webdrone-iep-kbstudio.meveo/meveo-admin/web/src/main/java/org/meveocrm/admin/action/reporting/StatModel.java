package org.meveocrm.admin.action.reporting;

import java.text.SimpleDateFormat;
import java.util.Date;

public class StatModel {

	private String description;
	private Double value;
	private Double difference;
	private Date lastUpdated;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public Double getDifference() {
		return difference;
	}

	public void setDifference(Double difference) {
		this.difference = difference;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public String getLastUpdateFormatted() {
		if (lastUpdated != null) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm a");
			return sdf.format(lastUpdated).toString();
		}
		return "";
	}

	public Double computeDifference(Double oldValue) {
		this.difference = ((value - oldValue) / ((oldValue == null || oldValue == 0) ? 1 : oldValue) * 100);
		return difference;
		/*
		 * mv1.getValue().subtract(mv2.getValue()).divide(mv2.getValue().equals(new
		 * BigDecimal("0.00")) ? ) .multiply(new
		 * BigDecimal("100")).doubleValue()
		 */
	}
}
