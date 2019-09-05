package ted.restapi.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import ted.restapi.persistence.entities.Item;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CustomListSerializer extends StdSerializer<List<Item>> {

    public CustomListSerializer() {
        this(null);
    }

    public CustomListSerializer(Class<List<Item>> t) {
        super(t);
    }

    @Override
    public void serialize(
            List<Item> items,
            JsonGenerator generator,
            SerializerProvider provider)
            throws IOException, JsonProcessingException {

        generator.writeStartObject();

        List<Integer> ids = new ArrayList<>();
        for (Item item : items) {
            ids.add(item.getId());
        }
        generator.writeObject(ids);
        generator.writeEndObject();
    }
}
