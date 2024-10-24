DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM produtos) THEN
        INSERT INTO products (descricao, preco, estoque, data) VALUES
        ('Pera', 6, 23, '2005-9-23'),
        ('Kiwi', 8, 11, '2024-10-21'),
        ('Transplante capilar', 99999, 3, '2021-08-10');
    END IF;
END $$;