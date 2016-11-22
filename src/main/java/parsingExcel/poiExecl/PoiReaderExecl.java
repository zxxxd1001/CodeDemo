package parsingExcel.poiExecl;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by 张雪冬 on 2016/11/22.
 */
public class PoiReaderExecl {
    public static void main(String[] args) {
        readerHSSFWorkBook("poiText.xls");
    }
    private static void readerHSSFWorkBook(String path){
        try {
            InputStream inputStream = new FileInputStream(path);
            POIFSFileSystem stream = new POIFSFileSystem(inputStream);
            //读取Excel 读取文件内容
            HSSFWorkbook hssfWorkbook=new HSSFWorkbook(stream);
            //获取第一个工作表work.getSheet("Sheet0");
            // HSSFSheet sheet=hssfWorkbook.getSheet("Sheet0");
            //读取默认第一个工作表sheet
            HSSFSheet sheet=hssfWorkbook.getSheetAt(0);
            HSSFRow row =sheet.getRow(0);
            //总行数
            int rowNum = sheet.getLastRowNum();
            //总列数
            int column=row.getPhysicalNumberOfCells();
            System.out.println("列总数:"+column);
            for(int i=0;i<=rowNum;i++) {
                String cellvalue = "";
                row = sheet.getRow(i);
                for (int j=0;j<column;j++) {
                    HSSFCell cell=row.getCell(j);
                    switch (cell.getCellType()) {
                        case HSSFCell.CELL_TYPE_NUMERIC:
                        case HSSFCell.CELL_TYPE_FORMULA:
                            // 判断当前的cell是否为Date
                            if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                //方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
                                //cellvalue = cell.getDateCellValue().toLocaleString();
                                //方法2：这样子的data格式是不带带时分秒的：2011-10-12
                                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                                Date date = cell.getDateCellValue();
                                cellvalue = sdf.format(date);
                            } else {
                                // 如果是纯数字 取得当前Cell的数值
                                cellvalue = String.valueOf(cell.getNumericCellValue());
                            }
                            break;
                        // 如果当前Cell的Type为string
                        case HSSFCell.CELL_TYPE_STRING:
                            // 取得当前的Cell字符串
                            cellvalue = cell.getRichStringCellValue().getString();
                            break;
                        // 默认的Cell值
                        default:
                            cellvalue = " ";
                    }
                    System.out.print(cellvalue + " ");
                }
                System.out.println();
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
