package parsingExcel.poiExecl;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by 张雪冬 on 2016/11/18.
 */
public class ExcelReader2007 {
    public static void main(String[] args) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss:SS");
        TimeZone t = sdf.getTimeZone();
        t.setRawOffset(0);
        sdf.setTimeZone(t);
        Long startTime = System.currentTimeMillis();
        String fileName = "../insurDeptDict.xlsx";
        // 检测代码
        try {
            PoiReadExcel er = new PoiReadExcel();
            // 读取excel2007
            er.testPoiExcel2007(fileName);
        } catch (Exception ex) {
        }
        Long endTime = System.currentTimeMillis();
        System.out.println("用时：" + sdf.format(new Date(endTime - startTime)));
    }
}

class PoiReadExcel {
    public void testPoiExcel2007(String strPath) {
        try {
            XSSFWorkbook xwb = new XSSFWorkbook(strPath);
            // 读取第一章表格内容
            XSSFSheet sheet = xwb.getSheetAt(0);
            // 定义 row、cell
            XSSFRow row;
            String cell;
            // 循环输出表格中的内容
            for (int i = sheet.getFirstRowNum(); i < sheet.getPhysicalNumberOfRows(); i++) {
                row = sheet.getRow(i);
                String [] str = row.getCell(0).toString().split("\\.");
                String strs="";
                if(str[0].length()==1){
                    strs="0"+str[0];
                }else if(str[0].length()==3){
                    strs="0"+str[0];
                }else{
                    strs=str[0];
                }
                System.out.println("insert into insur_dept_dict values (case when (select max(serial_no) from insur_dept_dict) is null then 1 else (select max(serial_no) from insur_dept_dict)+1 end,'"+strs+"','"+row.getCell(1)+"','');");
//                for (int j = row.getFirstCellNum(); j < row.getPhysicalNumberOfCells(); j++) {
//                    // 通过 row.getCell(j).toString() 获取单元格内容，
//                    cell = row.getCell(j).toString();
//
//                    System.out.print(cell + "\t");
//                }
                System.out.println("");
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}