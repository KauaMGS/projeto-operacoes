package br.com.kgsm.exception.exceptions;

public class BlankNameException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public BlankNameException(){
        super("Name is empty or null");
    }

}