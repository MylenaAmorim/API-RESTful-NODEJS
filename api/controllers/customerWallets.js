const uuidv4 = require('uuid/v4');

module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;
    const controller = {};
  
    const {
        customerWallets: customerWalletsMock,
    } = customerWalletsDB;

    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);
  
    controller.saveCustomerWallets = (req, res) => {
        customerWalletsMock.data.push({
            id: uuidv4(),
            franchisee: req.body.franchisee,
            address: req.body.address,
            cep: req.body.cep,
            city: req.body.city,
            state: req.body.state,
            region: req.body.region,
            cnpj: req.body.cnpj,
            qtt_employees: req.body.qtt_employees,
            email: req.body.email,
            phone: req.body.phone,
            tax: req.body.tax,
            annual_profit: req.body.annual_profit
        });
        res.status(201).json(customerWalletsMock);
    };
  
    controller.removeCustomerWallets = (req, res) => {
      const {
        customerId,
      } = req.params;
  
      const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);
  
      if (foundCustomerIndex === -1) {
        res.status(404).json({
          message: 'Cliente não encontrado na base.',
          success: false,
          customerWallets: customerWalletsMock,
        });
      } else {
        customerWalletsMock.data.splice(foundCustomerIndex, 1);
        res.status(200).json({
          message: 'Cliente encontrado e deletado com sucesso!',
          success: true,
          customerWallets: customerWalletsMock,
        });
      }
    };

    controller.updateCustomerWallets = (req, res) => {
        const {
            customerId,
        } = req.params;

        const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

        if (foundCustomerIndex === -1) {
            res.status(404).json({
              message: 'Cliente não encontrado na base.',
              success: false,
              customerWallets: customerWalletsMock,
            });
        } else {
            const newCustomer = {
              id: customerId ,
              franchisee: req.body.franchisee,
              address: req.body.address,
              cep: req.body.cep,
              city: req.body.city,
              state: req.body.state,
              region: req.body.region,
              cnpj: req.body.cnpj,
              qtt_employees: req.body.qtt_employees,
              email: req.body.email,
              phone: req.body.phone,
              tax: req.body.tax,
              annual_profit: req.body.annual_profit,
              createdAt: new Date()
            };
            
            customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);
            
            res.status(200).json({
              message: 'Cliente encontrado e atualizado com sucesso!',
              success: true,
              customerWallets: customerWalletsMock,
            });
          }
        }

    return controller;

}
