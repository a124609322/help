package com.help.util;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2016/4/13.
 */
public class ExcelUtil {

    private static Workbook wb;
    private static Sheet sheet;
    private static Row row;
    private static Cell cell;

    /**
     * 读取Excel表格表头的内容
     *
     * @param is
     * @return String 表头内容的数组
     */
    public static String[] readExcelTitle(InputStream is) throws IOException, InvalidFormatException {
        wb = WorkbookFactory.create(is);
        sheet = wb.getSheetAt(0);
        row = sheet.getRow(0);
        // 标题总列数
        int colNum = row.getPhysicalNumberOfCells();
        String[] title = new String[colNum];
        for (int i = 0; i < colNum; i++) {
            title[i] = getStringCellValue(row.getCell(i));
        }
        return title;
    }

    /**
     * 读取Excel数据内容
     *
     * @param is
     * @return Map 包含单元格数据内容的Map对象
     */
    public static String[][] readExcelContent(InputStream is) throws IOException, InvalidFormatException {
        wb = WorkbookFactory.create(is);
        sheet = wb.getSheetAt(0);
        // 得到总行数
        int rowNum = sheet.getLastRowNum();
        row = sheet.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();
        String[][] datas = new String[rowNum][colNum];
        int n = 0;
        // 正文内容应该从第二行开始,第一行为表头的标题
        for (int i = 1; i <= rowNum; i++) {
            row = sheet.getRow(i);
            for (int j = 0; j < colNum; j++) {
                cell = row.getCell(j);
                if (null != cell) {
                    datas[n][j] = getStringCellValue(cell);
                } else {
                    datas[n][j] = "";
                }
            }
            n++;
        }
        return datas;
    }

    /**
     * 读取Excel数据标题及内容
     *
     * @param is
     * @return Map 包含单元格数据内容的Map对象
     */
    public static String[][] readExcel(InputStream is) throws IOException, InvalidFormatException {
        wb = WorkbookFactory.create(is);
        sheet = wb.getSheetAt(0);
        // 得到总行数
        int rowNum = sheet.getLastRowNum();
        row = sheet.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();
        String[][] datas = new String[rowNum+1][colNum];
        int n = 0;
        // 正文内容应该从第二行开始,第一行为表头的标题
        for (int i = 0; i <= rowNum; i++) {
            row = sheet.getRow(i);
            for (int j = 0; j < colNum; j++) {
                cell = row.getCell(j);
                if (null != cell) {
                    datas[n][j] = getStringCellValue(cell);
                } else {
                    datas[n][j] = "";
                }
            }
            n++;
        }
        return datas;
    }


    /**
     * 获取单元格数据内容为字符串类型的数据
     *
     * @param cell Excel单元格
     * @return String 单元格数据内容
     */
    private static String getStringCellValue(Cell cell) {
        String strCell = "";
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                strCell = cell.getStringCellValue();
                break;
            case Cell.CELL_TYPE_NUMERIC:
                DecimalFormat df = new DecimalFormat("0.00");
                strCell = df.format(cell.getNumericCellValue());
                break;
            case Cell.CELL_TYPE_BOOLEAN:
                strCell = String.valueOf(cell.getBooleanCellValue());
                break;
            case Cell.CELL_TYPE_BLANK:
                strCell = "";
                break;
            default:
                strCell = "";
                break;
        }
        if (strCell.equals("") || strCell == null) {
            return "";
        }
        if (cell == null) {
            return "";
        }
        return strCell;
    }

    /**
     * 获取单元格数据内容为日期类型的数据
     *
     * @param cell Excel单元格
     * @return String 单元格数据内容
     */
    private String getDateCellValue(HSSFCell cell) {
        String result = "";
        try {
            int cellType = cell.getCellType();
            if (cellType == HSSFCell.CELL_TYPE_NUMERIC) {
                Date date = cell.getDateCellValue();
                result = (date.getYear() + 1900) + "-" + (date.getMonth() + 1)
                        + "-" + date.getDate();
            } else if (cellType == HSSFCell.CELL_TYPE_STRING) {
                String date = getStringCellValue(cell);
                result = date.replaceAll("[年月]", "-").replace("日", "").trim();
            } else if (cellType == HSSFCell.CELL_TYPE_BLANK) {
                result = "";
            }
        } catch (Exception e) {
            System.out.println("日期格式不正确!");
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 根据HSSFCell类型设置数据
     *
     * @param cell
     * @return
     */
    private String getCellFormatValue(HSSFCell cell) {
        String cellvalue = "";
        if (cell != null) {
            // 判断当前Cell的Type
            switch (cell.getCellType()) {
                // 如果当前Cell的Type为NUMERIC
                case HSSFCell.CELL_TYPE_NUMERIC:
                case HSSFCell.CELL_TYPE_FORMULA: {
                    // 判断当前的cell是否为Date
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        // 如果是Date类型则，转化为Data格式

                        //方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
                        //cellvalue = cell.getDateCellValue().toLocaleString();

                        //方法2：这样子的data格式是不带带时分秒的：2011-10-12
                        Date date = cell.getDateCellValue();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        cellvalue = sdf.format(date);

                    }
                    // 如果是纯数字
                    else {
                        // 取得当前Cell的数值
                        cellvalue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                // 如果当前Cell的Type为STRIN
                case HSSFCell.CELL_TYPE_STRING:
                    // 取得当前的Cell字符串
                    cellvalue = cell.getRichStringCellValue().getString();
                    break;
                // 默认的Cell值
                default:
                    cellvalue = " ";
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;

    }

    public static void exportExcel(String[][] data,OutputStream os) throws IOException {
        XSSFWorkbook xwb = new XSSFWorkbook();
        XSSFSheet sheet = xwb.createSheet("sheet");
        XSSFRow row = null;
        XSSFCell cell = null;
        String[] rowData = null;
        String cellData = null;
        for(int i = 0 ; i < data.length ;i++){
            rowData = data[i];
            row = sheet.createRow(i);
            for(int j = 0 ; j < rowData.length ; j++){
                cellData = rowData[j];
                cell = row.createCell(j);
                cell.setCellValue(cellData);
            }
        }
        xwb.write(os);
    }
}
