package org.meveo.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Test {
    private static final String REGEX = "\\b(ab)(cat)\\b";
    private static final String INPUT = "abcat cat cat cattie cat";
    public static void main(String[] args) throws Exception {

        Pattern p = Pattern.compile(REGEX);
        Matcher m = p.matcher(INPUT);   // get a matcher object
        int count = 0;

        while(m.find()) {
            count++;
            System.out.println("Match number "+count);
            System.out.println("start(): "+m.start());
            System.out.println("end(): "+m.end());
            System.out.println("group(): "+m.group(0));
        }
    }

    public List<String> validateGraphql(String graphQl) {
        List<String> result = new ArrayList<>();
        String pattern = "/: \\[?(?!(?:String|Boolean|GraphQLLong|ID|GraphQLBigDecimal)!?)(\\w*)\\]?!?\\s /mg";
        // Create a Pattern object
        Pattern r = Pattern.compile(pattern);
        // Now create matcher object.
        Matcher m = r.matcher(graphQl);
        while(m.find()) {
            if (m.start() == m.end()) {
                continue;
            }
            boolean typeExists = graphQl.contains("type " + m.group(1));
            if (!typeExists) {
                result.add(m.group(1));
            }
        }
        return result;
    }
}
