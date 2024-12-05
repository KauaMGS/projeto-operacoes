package br.com.kgsm.exception.exceptions;

public class BlankCategoryException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public BlankCategoryException(){
        super("Category is empty or null");
    }

}