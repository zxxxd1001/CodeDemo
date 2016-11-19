package parsingExcel.jxlExcel;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import java.io.File;
import java.io.IOException;

/**
 * Created by 张雪冬 on 2016/11/19.
 */
public class JxlReaderExcel {
    public static void main(String[] args) {
        try {
            //创建workbook
            Workbook workbook=Workbook.getWorkbook(new File("jxlText.xls"));
            //获取第一个工作表sheet
            Sheet sheet=workbook.getSheet(0);
            for(int i=0;i<sheet.getRows();i++){
                for(int j=0;j<sheet.getColumns();j++){
                    Cell cell=sheet.getCell(j,i);
                    System.out.print(cell.getContents()+" ");
                }
                System.out.println();
            }
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
