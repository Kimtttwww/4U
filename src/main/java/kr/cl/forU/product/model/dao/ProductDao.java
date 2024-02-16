package kr.cl.forU.product.model.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.cl.forU.product.model.vo.Product;

@Repository
public class ProductDao {

    @Autowired
    SqlSession session;
    private String map = "productMapper.";

    public Product getProductById(int prodNo) {
        return session.selectOne(map + "getProductById", prodNo);
    }
}
